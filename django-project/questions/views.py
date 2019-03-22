from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    title = 'What the actual?'
    body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus, ipsum id consectetur porttitor, augue lorem vehicula justo, quis vestibulum sapien est vel dolor. Quisque convallis eu neque eget molestie. Praesent faucibus ipsum quam, eu sollicitudin elit molestie sed. Duis nec dolor purus. Duis sit amet mauris feugiat, facilisis ex eu, pellentesque dui. Curabitur pharetra felis massa, quis hendrerit tortor sagittis ac. Suspendisse nulla ipsum, mattis a vehicula vel, porttitor sed purus. Integer lobortis imperdiet lobortis. Quisque tempus, diam non eleifend luctus, dui velit auctor elit, sed tincidunt leo nisl et justo.'
    date = '8th of September'
    data = []
    for i in range(15):
        data.append({
            'votes': 40,
            'answers': 4,
            'title': title,
            'body': body,
            'date': date
        })

    return render(request, 'questions/index.html', {
        'questions': data
    })
