from .models import Post


def post_count(request):
    count = Post.objects.count()
    return {'context_post_count': count}
