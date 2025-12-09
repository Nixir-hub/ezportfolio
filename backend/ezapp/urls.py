from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import UserProfileView, password_reset_request, password_reset_confirm
from .views import RegisterView
from .views import ChangePasswordView, DeleteAccountView
from .views import LoginView, LogoutView

from .views import activate_account

urlpatterns = [
    path('api/', include('rest_framework.urls')),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserProfileView.as_view(), name='user-profile'),
    path('register/', RegisterView.as_view()),
    path('activate/<uidb64>/<token>/', activate_account, name='activate'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
    path('password-reset/', password_reset_request, name='password_reset'),
    path('password-reset-confirm/<uid>/<token>/', password_reset_confirm, name='password_reset_confirm'),
]