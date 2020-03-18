BEGIN;

TRUNCATE logs;

INSERT INTO logs (latitude, longitude, title, description, image, rating)
VALUES
(42.21204, -71.1156, 'Mountains', 'Its very nice', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fmountain-range&psig=AOvVaw08cCWrey9RVfO3jguCbQAL&ust=1584589367476000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDrh8SNo-gCFQAAAAAdAAAAABAI', 3 ),
(42.3257, -71.0119842, 'Oceans', 'Its very beautiful', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ftropical%2Bocean&psig=AOvVaw3MkkPz5AX8rctCULo6Z8-b&ust=1584589505225000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiF7YWOo-gCFQAAAAAdAAAAABAD', 5);

COMMIT;

