<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Simple Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home">
      <h2>Home Section</h2>
      <p>This is the home section of the website.</p>
    </section>

    <section id="about">
      <h2>About Section</h2>
      <p>This section contains information about the website.</p>
    </section>

    <section id="contact">
      <h2>Contact Section</h2>
      <p>If you want to get in touch, fill out the form below:</p>
      <form id="contact-form">
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <textarea id="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My Simple Website</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
