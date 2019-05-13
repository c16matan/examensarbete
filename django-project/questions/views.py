from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db.models import Q, Count
from .models import Post, Comment


def index(request):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .filter(post_type=1) \
        .annotate(num_of_answers=Count("post")) \
        .order_by('-id')[:30]

    return render(request, 'questions/index.html', {
        'questions': posts
    })


def search(request, search):
    # Posts with post_type=1 is the questions
    posts = Post.objects \
        .annotate(num_of_answers=Count("post")) \
        .filter(post_type=1, search_vector=search) \
        .order_by('-id')[:50]

    total_amount_of_results = Post.objects \
        .filter(post_type=1, search_vector=search) \
        .count()

    return JsonResponse({
        'title': 'Questions containing \'' + search + '\'',
        'body': render_to_string('questions/search.html', {
            'search': search,
            'amount_of_results': len(posts),
            'total_amount_of_results': total_amount_of_results,
            'questions': posts
        })
    })


def question(request, question_id):
    # Get all posts regardless if its the question or answer
    posts = Post.objects \
        .filter(Q(id=question_id) | Q(parent_id=question_id)) \
        .order_by('id', 'score')

    # Get all comments on the posts above
    comments = Comment.objects \
        .filter(post_id__in=[post['id'] for post in posts.values()]) \
        .order_by('id') \
        .all()

    return render(request, 'questions/question.html', {
        'posts': posts,
        'comments': comments,
    })
