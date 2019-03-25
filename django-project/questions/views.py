from django.shortcuts import render
from .models import Post


def index(request):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .filter(post_type=1) \
        .order_by('-id'). \
        all()[:30].values()

    return render(request, 'questions/index.html', {
        'questions': posts
    })


def search(request, search):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .filter(post_type=1) \
        .filter(body__contains=search) \
        .order_by('-id'). \
        all().values()

    return render(request, 'questions/search.html', {
        'search': search,
        'questions': posts
    })


def question(request, question_id):
    return render(request, 'questions/question.html', {})
