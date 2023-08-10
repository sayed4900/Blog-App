
CREATE TABLE users(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  email  VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE posts(
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
  author_id INT NOT NULL,
  category_id INT NOT NULLm
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users (author_id) ON DELETE CASCADE
)

CREATE TABEL categories(
  category_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100) 
)

CREATE TABLE comments(
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content text NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
)

CREATE TABLE followers (
  follower_id INT AUTO_INCREMENT PRIMARY KEY,
  follower_user_id INT NOT NULL,
  following_user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (follower_user_id) REFERENCES users (user_id),
  FOREIGN KEY (following_user_id) REFERENCES users (user_id)
)