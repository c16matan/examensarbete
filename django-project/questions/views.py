from django.shortcuts import render
from django.db.models import Q
from .models import Post, Comment


def index(request):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .filter(post_type=1) \
        .order_by('-id') \
        .all()[:30]

    return render(request, 'questions/index.html', {
        'questions': posts
    })


def search(request, search):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .filter(post_type=1) \
        .filter(body__contains=search) \
        .order_by('-id') \
        .all()

    return render(request, 'questions/search.html', {
        'search': search,
        'amount_of_results': len(posts.values()),
        'questions': posts
    })


def question(request, question_id):
    # Get all posts regardless if its the question or answer
    posts = Post.objects \
        .filter(Q(id=question_id) | Q(parent_id=question_id)) \
        .order_by('id', 'score') \
        .all()

    # Get all comments on the posts above
    comments = Comment.objects \
        .filter(post_id__in=[post['id'] for post in posts.values()]) \
        .order_by('id') \
        .all()

    return render(request, 'questions/question.html', {
        'posts': posts,
        'amount_of_answers': len(posts) - 1,
        'comments': comments,
    })
