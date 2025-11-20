# Contributing to CODM Stats Analyzer

First off, thank you for considering contributing to CODM Stats Analyzer! It's people like you that make this project better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [krishnasinghprojects@gmail.com](mailto:krishnasinghprojects@gmail.com).

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows, macOS, Linux]
 - Browser: [e.g. Chrome, Safari, Firefox]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- `good-first-issue` - Issues that should only require a few lines of code
- `help-wanted` - Issues that are a bit more involved

## 🛠 Development Setup

### Prerequisites

- Node.js (v18.0 or higher)
- npm, yarn, or pnpm
- Git
- Google Gemini API Key
- Firebase Project

### Setup Steps

1. **Fork and Clone**

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/codm-stats-analyzer.git
cd codm-stats-analyzer
```

2. **Add Upstream Remote**

```bash
git remote add upstream https://github.com/krishnasinghprojects/codm-stats-analyzer.git
```

3. **Install Dependencies**

```bash
npm install
```

4. **Set Up Environment**

```bash
cp .env.example .env
# Edit .env with your API keys
```

5. **Run Development Server**

```bash
npm run dev
```

6. **Open Browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

```typescript
// Good
interface UserProfile {
  username: string;
  level: number;
  uid: string;
}

// Bad
interface Data {
  a: string;
  b: number;
  c: string;
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, label, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

// Bad
export function Button(props: any) {
  return <button onClick={props.click}>{props.text}</button>;
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme (gold and black)
- Ensure responsive design (mobile-first)
- Add hover and transition effects

```tsx
// Good
<div className="glass-panel rounded-xl p-6 hover:scale-105 transition-all duration-300">
  Content
</div>

// Bad
<div style={{ background: 'rgba(13, 13, 16, 0.85)', padding: '24px' }}>
  Content
</div>
```

### File Organization

```
components/
  ├── ComponentName.tsx       # Component file
  └── index.ts               # Export file (if needed)

pages/
  ├── page-name.tsx          # Page component
  └── api/
      └── endpoint.ts        # API route

lib/
  └── utility-name.ts        # Utility functions
```

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use trailing commas in objects and arrays
- Keep lines under 100 characters when possible

```typescript
// Good
const config = {
  apiKey: 'your-key',
  authDomain: 'your-domain',
};

// Bad
const config = {
  apiKey: "your-key",
  authDomain: "your-domain"
}
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(dashboard): add export to PNG functionality

- Added html2canvas library
- Created export button component
- Implemented download functionality

Closes #123
```

```bash
fix(auth): resolve Google sign-in redirect issue

Fixed the redirect loop that occurred after Google authentication
by updating the callback URL configuration.

Fixes #456
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Reference issues and pull requests when applicable
- Keep commits atomic (one logical change per commit)

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**

- Write clean, documented code
- Follow the coding guidelines
- Test your changes thoroughly

4. **Test locally**

```bash
npm run dev      # Test in development
npm run build    # Test production build
npm run lint     # Check for linting errors
```

5. **Commit your changes**

```bash
git add .
git commit -m "feat: add your feature"
```

6. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

### Submitting the PR

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Follows coding guidelines

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #issue_number
```

5. Submit the pull request

### After Submitting

- Respond to review comments promptly
- Make requested changes if needed
- Keep the PR updated with main branch
- Be patient and respectful

### PR Review Process

1. **Automated Checks**: CI/CD will run tests and linting
2. **Code Review**: Maintainers will review your code
3. **Feedback**: You may receive feedback or change requests
4. **Approval**: Once approved, your PR will be merged
5. **Celebration**: Your contribution is now part of the project! 🎉

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test the following:

- [ ] Application runs without errors
- [ ] All pages load correctly
- [ ] Authentication works (sign in/out)
- [ ] Image upload works
- [ ] AI analysis completes successfully
- [ ] Dashboard displays correctly
- [ ] Share functionality works
- [ ] Responsive design on mobile
- [ ] No console errors or warnings
- [ ] Browser compatibility (Chrome, Firefox, Safari)

### Testing New Features

When adding new features:

1. Test the happy path (everything works)
2. Test edge cases (empty inputs, large files, etc.)
3. Test error handling (network errors, API failures)
4. Test on different screen sizes
5. Test on different browsers

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

## ❓ Questions?

If you have questions, feel free to:

- Open an issue with the `question` label
- Email: [krishnasinghprojects@gmail.com](mailto:krishnasinghprojects@gmail.com)
- Join discussions in existing issues

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

---

**Happy Coding! 🚀**
