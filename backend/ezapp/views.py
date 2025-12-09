
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from rest_framework.response import Response
from django.contrib.auth.tokens import default_token_generator
from decouple import config

FRONTEND_URL = config("FRONTEND_URL")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []  # każdy może się zarejestrować

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # utworzenie użytkownika, ale NIE aktywnego
        user = serializer.save(is_active=False)

        # --- generujemy uid + token ---
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        activation_link = f"{FRONTEND_URL}/activate/{uid}/{token}/"
        print("SMTP SETTINGS:", config("EMAIL_HOST", config("EMAIL_HOST_USER")))

        # --- wysyłamy maila aktywacyjnego ---
        send_mail(
            subject="Activate your account",
            message=f"Click here to activate your account:\n{activation_link}",
            from_email=config("DEFAULT_FROM_EMAIL"),  # 🔥 ważne przy OVH
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response(
            {
                "message": "User registered. Check your email to activate your account.",
                "activation_link_dev": activation_link  # 🔥 do debugowania lokalnie
            },
            status=status.HTTP_201_CREATED
        )



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })




@api_view(["GET"])
@permission_classes([AllowAny])
def activate_account(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "Incorrect link"}, status=400)

    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response({"message": "Account activated successfully."})

    return Response({"error": "Invalid or expired token."}, status=400)



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({"error": "Invalid old password"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated."}, status=status.HTTP_200_OK)



class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Account deleted."}, status=status.HTTP_200_OK)



class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)  # <- tworzy sessionid

            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "username": user.username,
            })

        return Response({"detail": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except:
                pass

        logout(request)  # usuwa sessionid
        return Response({"message": "Logout."}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Nie zdradzamy czy user istnieje
        return Response({"message": "If this email exists, a reset link was sent."})

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    reset_link = f"{FRONTEND_URL}/reset-password/{uid}/{token}/"

    send_mail(
        "Password Reset",
        f"Click here to reset your password:\n{reset_link}",
        DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

    return Response({"message": "If this email exists, a reset link was sent."})



@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        return Response({"error": "Invalid link"}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=400)

    new_password = request.data.get("password")
    if not new_password:
        return Response({"error": "Password is required"}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password has been reset successfully"})
