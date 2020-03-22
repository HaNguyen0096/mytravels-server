BEGIN;

TRUNCATE logs;

INSERT INTO logs (latitude, longitude, title, description, image, rating, visited_day, public)
VALUES
(42.2, -71.1, 'Mountains', 'Its very nice', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/800px-Clouds_over_the_Atlantic_Ocean.jpg', 3, '2020-03-18T07:55:12.825Z', false ),
(42.5, -71.01, 'Oceans', 'Its very beautiful', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1920px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg', 5, '2020-03-18T07:55:12.825Z', true);

COMMIT;

