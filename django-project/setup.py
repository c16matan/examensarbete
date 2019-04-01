from setuptools import setup, find_packages

setup(
    name='django-project',
    version='0.1',
    url='https://github.com/c16matan/examensarbete',
    packages=find_packages(),
    install_requires=[
        'django == 2.2',
        'psycopg2 == 2.7.7',
    ],
)
