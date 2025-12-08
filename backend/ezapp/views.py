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


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []  # każdy może się zarejestrować

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # generujemy token i uid
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        activation_link = f"http://localhost:8000/activate/{uid}/{token}/"

        # wysyłamy maila
        send_mail(
            'Aktywacja konta',
            f'Kliknij tutaj, aby aktywować konto: {activation_link}',
            'noreply@example.com',
            [user.email],
            fail_silently=False,
        )

        return Response(
            {"message": "Zarejestrowano użytkownika. Sprawdź e-mail w celu aktywacji."},
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
    except:
        return Response({"error": "Nieprawidłowy link"}, status=400)

    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()

        # Możesz odesłać respons JSON:
        # return Response({"message": "Konto aktywowane!"})

        # Albo przekierować na frontend:
        return redirect("http://localhost:3000/login")

    return Response({"error": "Nieprawidłowy lub wygasły token"}, status=400)



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({"error": "Stare hasło nieprawidłowe"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Hasło zmienione pomyślnie"})



class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Konto zostało usunięte"})



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

        return Response({"detail": "Błędne dane logowania"}, status=status.HTTP_401_UNAUTHORIZED)


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
        return Response({"message": "Wylogowano"}, status=status.HTTP_200_OK)


