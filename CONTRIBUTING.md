# Contributing to EzPortfolio

Thank you for your interest in contributing to **EzPortfolio**! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

Be respectful, inclusive, and professional in all interactions. We're building this together!

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 16+
- PostgreSQL 13+
- Git
- Docker & Docker Compose (optional, for container development)

### Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ezportfolio.git
cd ezportfolio
git remote add upstream https://github.com/Nixir-hub/ezportfolio.git
```

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

---

## Development Setup

### Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Docker Setup (Optional)

```bash
docker-compose up --build
```

---

## Code Style

### Python (Backend)

- Follow **PEP 8** standards
- Use meaningful variable names
- Add docstrings to functions and classes
- Maximum line length: 100 characters
- Use type hints where applicable

Example:

```python
def calculate_model_accuracy(y_true: list, y_pred: list) -> float:
    """
    Calculate accuracy of model predictions.
    
    Args:
        y_true: List of ground truth labels
        y_pred: List of predicted labels
        
    Returns:
        float: Accuracy score between 0 and 1
    """
    correct = sum(1 for t, p in zip(y_true, y_pred) if t == p)
    return correct / len(y_true)
```

### JavaScript/React (Frontend)

- Use **ESLint** (run `npm run lint`)
- Use camelCase for variables and functions
- Use PascalCase for React components
- Add JSDoc comments for complex functions
- Keep components under 300 lines

Example:

```javascript
/**
 * Displays ML model training results
 * @param {Object} data - Training metrics
 * @param {number} data.accuracy - Model accuracy
 * @param {number} data.loss - Training loss
 * @returns {JSX.Element} Rendered component
 */
export default function ModelResults({ data }) {
  return (
    <div className="results">
      <p>Accuracy: {data.accuracy.toFixed(4)}</p>
      <p>Loss: {data.loss.toFixed(4)}</p>
    </div>
  );
}
```

---

## Commit Guidelines

Use **conventional commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **test**: Adding or updating tests
- **chore**: Dependency updates, build changes

### Examples

```bash
git commit -m "feat(auth): add two-factor authentication support"
git commit -m "fix(ml-backend): handle numpy array serialization error"
git commit -m "docs(readme): add deployment instructions"
git commit -m "refactor(frontend): simplify component state management"
```

---

## Pull Request Process

### Before Creating a PR

1. **Ensure code works** - Test all changes locally
2. **Update documentation** - Add docstrings and comments
3. **Add tests** - Write unit tests for new features (if applicable)
4. **Keep commits clean** - Squash related commits if needed
5. **Sync with main branch** - Pull latest from upstream

```bash
git fetch upstream
git rebase upstream/master
```

### Creating a PR

1. Push your branch: `git push origin feature/your-feature-name`
2. Open PR on GitHub with a clear title and description
3. Link related issues: "Fixes #123"
4. Add a summary of changes

### PR Description Template

```markdown
## Description
Brief explanation of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
- [ ] Unit tests added
- [ ] Manual testing completed
- [ ] All tests pass

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

- At least one maintainer review required
- Address all comments and suggestions
- Request re-review after making changes

---

## Reporting Bugs

### Before Reporting

- Check existing issues to avoid duplicates
- Test on latest `master` branch
- Provide minimal reproducible example

### Bug Report Format

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Ubuntu 22.04 / Windows 10 / macOS 13
- Python: 3.11
- Node: 18.0
- Browser: Chrome 120 (if frontend bug)

## Error Messages
```
Full error traceback here
```

## Screenshots
If applicable, add screenshots
```

---

## Feature Requests

### Format

```markdown
## Description
What feature do you want to add?

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Any other approaches?

## Additional Context
Links, references, examples
```

---

## Testing

### Running Tests

```bash
# Backend tests
python manage.py test

# Frontend tests
npm test
```

### Writing Tests

- Test one thing per test
- Use descriptive test names
- Aim for >80% code coverage on new code

---

## Questions?

- Open an issue with the `question` label
- Check existing discussions
- Contact maintainers

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🎉
