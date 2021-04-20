from django.db import models


class Book(models.Model):
    """Книга"""

    title = models.CharField(max_length=255, verbose_name='Название')
    author = models.CharField(max_length=255, verbose_name='Автор')
    publication_year = models.PositiveIntegerField(verbose_name='Год выпуска')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"
