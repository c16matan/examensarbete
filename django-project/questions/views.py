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
