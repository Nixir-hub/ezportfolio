import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


@pytest.mark.django_db
def test_account_activation(client):
    # 1. Tworzymy nieaktywnego usera
    user = User.objects.create_user(
        username="testuser",
        email="test@test.com",
        password="Test1234!",
        is_active=False
    )

    # 2. Generujemy UID i token jak w emailu
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    activation_url = reverse("activate", kwargs={"uidb64": uidb64, "token": token})

    # 3. Wywołujemy endpoint aktywacji
    response = client.get(activation_url)

    assert response.status_code == 302
    user.refresh_from_db()
    assert user.is_active is True
