import torch
import torch.nn as nn

class LinearRegressionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return self.linear(x)


# ---- classification (2D) ----
class SimpleMLP(nn.Module):
    def __init__(self, input_dim=2, hidden=32, output_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden),
            nn.ReLU(),
            nn.Linear(hidden, hidden),
            nn.ReLU(),
            nn.Linear(hidden, output_dim)
        )
    def forward(self, x):
        return self.net(x)


def build_poly_features(X, degree=3):
    return torch.cat([X ** i for i in range(1, degree+1)], dim=1)

class PolynomialRegression(nn.Module):
    def __init__(self, degree=3):
        super().__init__()
        self.linear = nn.Linear(degree, 1)

    def forward(self, x):
        x_poly = build_poly_features(x, degree=self.linear.in_features)
        return self.linear(x_poly)


class SinModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.A = nn.Parameter(torch.tensor([1.0]))
        self.w = nn.Parameter(torch.tensor([1.0]))
        self.b = nn.Parameter(torch.tensor([0.0]))

    def forward(self, x):
        return self.A * torch.sin(self.w * x + self.b)



class MLPRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(1, 16),
            nn.ReLU(),
            nn.Linear(16, 16),
            nn.ReLU(),
            nn.Linear(16, 1)
        )

    def forward(self, x):
        return self.net(x)



class LogRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return self.linear(torch.log(x + 1e-6))



class ExpRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return torch.exp(self.linear(x))



class SigmoidRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return torch.sigmoid(self.linear(x))
