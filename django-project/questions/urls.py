from django.urls import path
from . import views

app_name = 'questions'
urlpatterns = [
    path('', views.index, name='index'),
    path('search/<str:search>', views.search, name='search'),
    path('question/<int:question_id>', views.question, name='question')
]
