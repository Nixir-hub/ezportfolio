from django.urls import path
from .views import create_dataset, train_test_split_view, train_model, predict, train_regression, classify_train, \
    train_regression_sin, train_regression_poly


urlpatterns = [
    path("dataset/", view=create_dataset),
    path("split/", train_test_split_view),
    path("train/", train_model),
    path("predict/", predict),
    path("ml/regression/", train_regression),
    path("ml/regression/sin/", train_regression_sin),
    path("ml/regression/poly/", train_regression_poly),
    path("ml/classify/", classify_train),

]
