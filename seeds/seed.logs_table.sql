BEGIN;

TRUNCATE logs;

INSERT INTO logs (latitude, longitude, title, description, image, rating, visited_day)
VALUES
(42.2, -71.1, 'Mountains', 'Its very nice', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fmountain-range&psig=AOvVaw08cCWrey9RVfO3jguCbQAL&ust=1584589367476000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDrh8SNo-gCFQAAAAAdAAAAABAI', 3, '2020-03-18T07:55:12.825Z' ),
(42.5, -71.01, 'Oceans', 'Its very beautiful', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ftropical%2Bocean&psig=AOvVaw3MkkPz5AX8rctCULo6Z8-b&ust=1584589505225000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiF7YWOo-gCFQAAAAAdAAAAABAD', 5, '2020-03-18T07:55:12.825Z');

COMMIT;

