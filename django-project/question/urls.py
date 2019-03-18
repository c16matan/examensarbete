from django.urls import path
from . import views

app_name = 'question'
urlpatterns = [
    path('', views.index, name='index')
]
