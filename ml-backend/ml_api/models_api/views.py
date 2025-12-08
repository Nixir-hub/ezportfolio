from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
import numpy as np
from sklearn.datasets import make_circles, make_moons
from sklearn.model_selection import train_test_split
from .models import LinearRegressionModel, SimpleMLP, SinModel
from rest_framework.decorators import api_view
from rest_framework.response import Response
import torch
import torch.nn as nn
import torch.optim as optim
import math


# CHARTS

@api_view(["GET"])
def create_dataset(request):
    # y = 2x + 3 + noise
    X = np.arange(0, 100).astype(np.float32)
    noise = np.random.randn(*X.shape).astype(np.float32)
    y = 2 * X + 3 + noise

    return Response({
        "X": X.tolist(),
        "y": y.tolist()
    })



@api_view(["POST"])
def train_test_split_view(request):
    X = np.array(request.data["X"], dtype=np.float32)
    y = np.array(request.data["y"], dtype=np.float32)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    return Response({
        "X_train": X_train.tolist(),
        "X_test": X_test.tolist(),
        "y_train": y_train.tolist(),
        "y_test": y_test.tolist()
    })



@api_view(["POST"])
def train_model(request):
    X_train = torch.tensor(request.data["X_train"]).unsqueeze(1)
    y_train = torch.tensor(request.data["y_train"]).unsqueeze(1)

    model = LinearRegressionModel()
    loss_fn = nn.MSELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=0.001)

    epochs = 200

    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()

        preds = model(X_train)
        loss = loss_fn(preds, y_train)
        loss.backward()
        optimizer.step()

    # Extract weights
    weight = model.linear.weight.item()
    bias = model.linear.bias.item()

    return Response({
        "weight": weight,
        "bias": bias,
        "loss": loss.item()
    })


@api_view(["POST"])
def predict(request):
    x = torch.tensor([request.data["value"]], dtype=torch.float32)

    model = LinearRegressionModel()
    model.linear.weight.data[...] = request.data["weight"]
    model.linear.bias.data[...] = request.data["bias"]

    y_pred = model(x).item()

    return Response({"prediction": y_pred})



@api_view(["GET"])
def generate_dataset(request):
    kind = request.GET.get("type", "circles")

    if kind == "circles":
        X, y = make_circles(n_samples=1000, noise=0.1, factor=0.5)
    elif kind == "moons":
        X, y = make_moons(n_samples=1000, noise=0.1)
    else:
        return Response({"error": "Unknown dataset type"}, status=400)

    return Response({
        "X": X.tolist(),
        "y": y.tolist()
    })


def tensors_from_request(data):
    X = torch.tensor(data["X"], dtype=torch.float32)
    y = torch.tensor(data["y"], dtype=torch.long)
    return X, y


def build_classifier(input_dim=2, hidden=16, output_dim=2):
    model = nn.Sequential(
        nn.Linear(input_dim, hidden),
        nn.ReLU(),
        nn.Linear(hidden, hidden),
        nn.ReLU(),
        nn.Linear(hidden, output_dim)
    )
    return model


@api_view(["POST"])
def train_view(request):
    X, y = tensors_from_request(request.data)

    model = build_classifier()
    loss_fn = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

    epochs = 200
    history = {"loss": [], "accuracy": []}

    for epoch in range(epochs):
        model.train()

        logits = model(X)
        loss = loss_fn(logits, y)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # accuracy
        preds = torch.argmax(torch.softmax(logits, dim=1), dim=1)
        acc = (preds == y).float().mean().item()

        history["loss"].append(loss.item())
        history["accuracy"].append(acc)

    # zwracamy parametry modelu
    weights = {}
    for name, param in model.named_parameters():
        weights[name] = param.detach().tolist()

    return Response({
        "history": history,
        "weights": weights
    })


@api_view(["POST"])
def evaluate_view(request):
    X, y = tensors_from_request(request.data["test"])

    model = build_classifier()
    for name, param in model.named_parameters():
        param.data = torch.tensor(request.data["weights"][name], dtype=torch.float32)

    logits = model(X)
    preds = torch.argmax(torch.softmax(logits, dim=1), dim=1)

    accuracy = (preds == y).float().mean().item()

    return Response({
        "accuracy": accuracy,
        "predictions": preds.tolist()
    })



@api_view(["POST"])
def predict_view(request):
    x = torch.tensor(request.data["x"], dtype=torch.float32)

    model = build_classifier()
    for name, param in model.named_parameters():
        param.data = torch.tensor(request.data["weights"][name], dtype=torch.float32)

    logits = model(x)
    probs = torch.softmax(logits, dim=1).tolist()
    label = torch.argmax(logits).item()

    return Response({
        "logits": logits.tolist(),
        "probabilities": probs,
        "label": label
    })



# ---- helpers ----
def to_tensor_xy(points):
    X = np.array([[p["x"], p["y"]] for p in points], dtype=np.float32)
    return torch.tensor(X), None

def to_tensor_xy_y(points):
    X = np.array([[p["x"], p["y"]] for p in points], dtype=np.float32)
    y = np.array([p["label"] for p in points], dtype=np.int64)
    return torch.tensor(X), torch.tensor(y)



# ---- regression (linear) ----
def sanitize_value(v):
    if isinstance(v, float):
        if math.isnan(v) or math.isinf(v):
            return None
    return v



def sanitize_dict(d):
    out = {}
    for k, v in d.items():
        if isinstance(v, dict):
            out[k] = sanitize_dict(v)
        elif isinstance(v, list):
            out[k] = [sanitize_value(i) for i in v]
        else:
            out[k] = sanitize_value(v)
    return out



@api_view(["POST"])
def train_regression(request):
    data = request.data

    points = data.get("points", [])
    lr = float(data.get("lr", 0.01))
    epochs = int(data.get("epochs", 200))

    if len(points) < 2:
        return Response({"error": "Need at least 2 points"}, status=400)

    X = torch.tensor([[p["x"]] for p in points], dtype=torch.float32)
    y = torch.tensor([[p["y"]] for p in points], dtype=torch.float32)

    model = nn.Linear(1, 1)
    loss_fn = nn.MSELoss()
    optimizer = optim.SGD(model.parameters(), lr=lr)

    loss_history = []

    for epoch in range(epochs):
        optimizer.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, y)

        loss.backward()
        optimizer.step()

        loss_history.append(float(loss.item()))

    slope = float(model.weight.item())
    bias = float(model.bias.item())

    # siatka do rysowania linii
    xs = torch.linspace(-10, 10, 200).unsqueeze(1)

    with torch.no_grad():
        ys = model(xs).squeeze().tolist()

    return Response({
        "s": slope,
        "b": bias,
        "xs": xs.squeeze().tolist(),
        "ys": ys,
        "loss_history": loss_history
    })




@api_view(["POST"])
@permission_classes([AllowAny])
def classify_train(request):
    body = request.data
    points = body.get("points", [])
    epochs = int(body.get("epochs", 100))
    lr = float(body.get("lr", 0.01))
    grid_res_raw = body.get("grid_res", 50)
    try:
        grid_res = int(grid_res_raw)
    except:
        grid_res = 50

    if len(points) < 4:
        return Response({"error": "Not enough points"}, status=400)

    X = np.array([[p["x"], p["y"]] for p in points], dtype=np.float32)
    y = np.array([p["label"] for p in points], dtype=np.int64)

    X_t = torch.tensor(X)
    y_t = torch.tensor(y)

    # 4 klasy
    model = SimpleMLP(input_dim=2, hidden=32, output_dim=4)
    loss_fn = nn.CrossEntropyLoss()
    opt = torch.optim.Adam(model.parameters(), lr=lr)

    # siatka pod decision boundary
    x_min, x_max = X[:,0].min() - 1.0, X[:,0].max() + 1.0
    y_min, y_max = X[:,1].min() - 1.0, X[:,1].max() + 1.0

    xs_lin = np.linspace(x_min, x_max, grid_res)
    ys_lin = np.linspace(y_min, y_max, grid_res)
    xx, yy = np.meshgrid(xs_lin, ys_lin)
    grid_xy = np.stack([xx.ravel(), yy.ravel()], axis=1)
    grid_t = torch.tensor(grid_xy, dtype=torch.float32)

    last_loss = None
    last_acc = None

    # trening
    for ep in range(epochs):
        model.train()
        logits = model(X_t)
        loss = loss_fn(logits, y_t)
        last_loss = float(loss.item())

        opt.zero_grad()
        loss.backward()
        opt.step()

        with torch.no_grad():
            probs = torch.softmax(model(X_t), dim=1)
            preds = torch.argmax(probs, dim=1)
            last_acc = float((preds == y_t).float().mean().item())

    # obliczamy siatkę - final decision boundary
    with torch.no_grad():
        grid_logits = model(grid_t)
        grid_preds = torch.argmax(grid_logits, dim=1).cpu().numpy()  # teraz zwracamy klasę 0-3

    grid = {
        "res": grid_res,
        "x_min": float(x_min),
        "x_max": float(x_max),
        "y_min": float(y_min),
        "y_max": float(y_max),
        "classes": grid_preds.tolist()  # lista klas dla każdej komórki
    }

    # ostatnie parametry -> pod frontend
    final_params = {k: v.detach().cpu().numpy().tolist() for k, v in model.state_dict().items()}

    return Response({
        "loss": last_loss,
        "acc": last_acc,
        "grid": grid,
        "params": final_params
    })


@api_view(["POST"])
def train_regression_poly(request):
    data = request.data
    points = data.get("points", [])
    lr = float(data.get("lr", 0.01))
    degree = int(data.get("degree", 3))
    epochs = int(data.get("epochs", 300))

    if len(points) < degree + 1:
        return Response({"error": "Not enough points"}, status=400)

    X = torch.tensor([[p["x"]] for p in points], dtype=torch.float32)
    y = torch.tensor([[p["y"]] for p in points], dtype=torch.float32)

    # Bazujemy na wielomianie
    def make_poly(x):
        return torch.cat([x ** i for i in range(1, degree + 1)], dim=1)

    Xp = make_poly(X)

    model = nn.Linear(degree, 1)
    loss_fn = nn.MSELoss()
    opt = torch.optim.Adam(model.parameters(), lr=lr)

    history = []

    for ep in range(epochs):
        opt.zero_grad()
        pred = model(Xp)
        loss = loss_fn(pred, y)

        loss.backward()
        opt.step()

        history.append(float(loss.item()))

    # siatka do rysowania krzywej
    xs = torch.linspace(X.min(), X.max(), 300).unsqueeze(1)

    with torch.no_grad():
        ys = model(make_poly(xs)).squeeze().tolist()

    params = {name: p.detach().tolist() for name, p in model.named_parameters()}

    return Response({
        "params": params,
        "xs": xs.squeeze().tolist(),
        "ys": ys,
        "loss_history": history,
        "degree": degree
    })



@api_view(["POST"])
def train_regression_sin(request):
    data = request.data
    points = data.get("points", [])
    lr = float(data.get("lr", 0.01))
    epochs = int(data.get("epochs", 500))

    if len(points) < 3:
        return Response({"error": "Need at least 3 points"}, status=400)

    X = torch.tensor([[p["x"]] for p in points], dtype=torch.float32)
    y = torch.tensor([[p["y"]] for p in points], dtype=torch.float32)

    model = SinModel()
    loss_fn = nn.MSELoss()
    opt = torch.optim.Adam(model.parameters(), lr=lr)

    history = []

    for ep in range(epochs):
        opt.zero_grad()
        pred = model(X)
        loss = loss_fn(pred, y)

        loss.backward()
        opt.step()

        history.append(float(loss.item()))

    # siatka do wykresu
    xs = torch.linspace(-10, 10, 300).unsqueeze(1)

    with torch.no_grad():
        ys = model(xs).squeeze().tolist()

    params = {
        "A": float(model.A.item()),
        "w": float(model.w.item()),
        "b": float(model.b.item())
    }

    return Response({
        "params": params,
        "xs": xs.squeeze().tolist(),
        "ys": ys,
        "loss_history": history
    })