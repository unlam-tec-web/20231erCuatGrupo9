create database taller2;
use taller2;


-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'su contra';

create table product(
id smallint primary key not null auto_increment,
name varchar(40) not null,
image varchar(40) not null,
price decimal not null
)

INSERT INTO product (name, image, price)
VALUES
    ('Dishonored', 'assets/img/dishonored.jpg', 45.6),
    ('Prey', 'assets/img/prey.jpg', 2689),
    ('Battlefield 1', 'assets/img/battlefield1.jpg', 2689),
    ('Doom', 'assets/img/doom.jpg', 2689),
    ('Far Cry', 'assets/img/farcry.jpg', 2689),
    ('Hitman', 'assets/img/hitman.jpg', 2689),
    ('Horizon', 'assets/img/horizon.jpg', 2689),
    ('Medium', 'assets/img/medium.jpg', 30);
    
select * from product;

