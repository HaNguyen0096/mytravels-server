BEGIN;

TRUNCATE logs, users RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, full_name, password)
VALUES
  ('user1', 'User1', 'User1231!'),
  ('user2', 'User2', 'User1232!');

INSERT INTO logs (user_id, latitude, longitude, title, description, image, rating, visited_day, public)
VALUES
(1, 42.3554, -71.0640, 'Boston Common', 'This is a beautiful place', 'https://www.omnihotels.com/-/media/images/hotels/bospar/destinations/bospar-boston-common.jpg?h=660&la=en&w=1170', 9, '2020-03-18T07:55:12.825Z', true),
(1, 42.2, -71.1, 'Oceans', 'Its very nice', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/800px-Clouds_over_the_Atlantic_Ocean.jpg', 3, '2020-03-18T07:55:12.825Z', false ),
(2, 42.5, -71.01, 'Mountain', 'Its very beautiful', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1920px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg', 5, '2020-03-18T07:55:12.825Z', true),
(2, 48.8584, 2.2945, 'Eiffel Tower', 'The tower is so tall', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg', 10, '2020-03-18T07:55:12.825Z', true);
COMMIT;

