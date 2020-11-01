from django.conf import settings


def get_front_url(key, *args, **kwargs):
    url = settings.FRONTEND_HOST + settings.FRONTEND_URLS[key]
    return url.format(*args, **kwargs)
