from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
import pytest


@pytest.mark.django_db
class TestUserAuth:

    def setup_method(self):
        self.client = APIClient()

    def test_register(self):
        data = {
            "username": "testuser",
            "email": "test@test.com",
            "password": "Test1234!"
        }

        response = self.client.post("/register/", data)

        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username="testuser").exists()

    def test_login_jwt(self):
        User.objects.create_user(username="testuser", password="Test1234!")

        response = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "Test1234!"
        })

        assert response.status_code == 200
        assert "access" in response.data

    def test_get_profile(self):
        user = User.objects.create_user(username="testuser", password="Test1234!")
        response = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "Test1234!"
        })
        token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/user/")

        assert response.status_code == 200
        assert response.data["username"] == "testuser"

    def test_change_password(self):
        user = User.objects.create_user(username="testuser", password="Test1234!")
        token = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "Test1234!"
        }).data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.post("/change-password/", {
            "old_password": "Test1234!",
            "new_password": "NewPass123!"
        })

        assert response.status_code == 200

    def test_delete_account(self):
        user = User.objects.create_user(username="testuser", password="Test1234!")
        token = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "Test1234!"
        }).data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.delete("/delete-account/")

        assert response.status_code == 200
        assert not User.objects.filter(username="testuser").exists()
