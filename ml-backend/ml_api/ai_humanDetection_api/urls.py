from django.urls import path
from .views import PersonDetectView

urlpatterns = [
    path('cv/person-detect/', PersonDetectView.as_view(), name='person-detect'),
]