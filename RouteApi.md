# API Documentation

## User Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/user` | `{ "username": "Pedro", "password": "123456", "is_admin": false, "firstname": "Pierre", "lastname": "Pleurotte", "email": "p.p@mail.com", "postal_code": "4000-Liège", "gender": "x", "birthday": "2000-10-21", "bio"?: "blablabla", "profile_image"?: "prout.jpg" }` | Create a new user |
| GET | `/user` | `{ "id": 3 }` | Get a user's information |
| PATCH | `/user` | `{ "username"?: "Pedro", "password"?: "123456", "is_admin"?: false, "firstname"?: "Pierre", "lastname"?: "Pleurotte", "email"?: "p.p@mail.com", "postal_code"?: "4000-Liège", "gender"?: "x", "birthday"?: "2000-10-21", "bio"?: "blablabla", "profile_image"?: "prout.jpg", "level"?: 21, "xp"?: 134 }` | Change information about a user |
| DELETE | `/user` | `{ "id": 3 }` | Delete a user |

## Tags Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/tags` | `{ "user_id"?: 3, "garden_id"?: 3, "tag": "#banana" }` | Add a new tag |
| DELETE | `/tags` | `{ "user_id": 3, "garden_id"?: 3, "tag": "#banana" }` | Delete a tag |
| GET | `/tags` | `{ "user_id"?: 3, "garden_id"?: 3 }` | Get tags |

## Follower Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/follower` | `{ "user_id"?: 3, "garden_id"?: 4, "follower_id": 3 }` | Follow a garden or a user |
| DELETE | `/follower` | `{ "user_id"?: 3, "garden_id"?: 4, "follower_id": 3 }` | Delete a follow |
| GET | `/follower` | `{ "user_id"?: 3, "garden_id"?: 2 }` | Return all followed details |
| GET | `/follower/count` | `{ "user_id"?: 3, "garden_id"?: 2 }` | Return followers number |

## Garden Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/garden` | `{ "author_id": 2, "name": "Manulo", "description": "proutland", "latitude": "894512940.322", "longitude": "1345323.324", "length": 23.3, "width": 32.45, "privacy": "Public", "type": "Professionnal" }` | Create a new garden |
| PATCH | `/garden` | `{ "author_id"?: 2, "name"?: "Manulo", "description"?: "proutland", "latitude"?: "894512940.322", "longitude"?: "1345323.324", "length"?: 23.3, "width"?: 32.45, "privacy"?: "Public", "type"?: "Professionnal" }` | Edit a garden |
| GET | `/garden` | `{ "garden_id": 3 }` | Get one garden and forgein key with id |
| GET | `/garden/user` | `{ "user_id": 3 }` | Get all gardens used by user |
| GET | `/garden/tags` | `{ "tag"_list "#prout, #pioche" }` | Get all gardens by hashtags |

## Parcel Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/garden/parcel` | `{ "garden_id": 3, "length": 23.34, "width": 32.23, "x_position": 32.2, "y_position": 22.2, parcel_angle: 75 }` | Create a new parcel |
| PATCH | `/garden/parcel` | `{ "length"?: 23.34, "width"?: 32.23, "x_position"?: 32.2, "y_position"?: 22.2, parcel_angle: 75  }` | Edit a parcel |
| GET | `/garden/parcel` | `{ "garden_id": 3 }` | Get all parcels with garden id |
| DELETE | `/garden/parcel` | `{ "parcel_id": 2 }` | Delete a parcel |

## Line Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/garden/parcel/line` | `{ "parcel_id": 2, "length": 32.3 }` | Create a new line |
| PATCH | `/garden/parcel/line` | `{ "length": 30.0 }` | Edit a line |
| GET | `/garden/parcel/line` | `{ "parcel_id": 2 }` | Get a parcel line |
| DELETE | `/garden/parcel/line` | `{ "line_id": 2 }` | Delete a line |

## Crops Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/crops` | `{ "line_id"?: 3, "plant_nursery_id"?: 2, "vegetable": "Pomme", "variety": "tigre", "icon": "apple.jpg" }` | Create a new crop |
| PATCH | `/crops` | `{ "line_id"?: 3, "plant_nursery_id"?: 2 }` | Edit a crop |
| GET | `/crops` | `{ "vegetable": "courgette" }` | Get all vegetables with vegetable |
| DELETE | `/crops` | `{ "id": 2 }` | Delete a crop |

## Log Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/log` | `{ "author_id"?: 2, "garden_id"?: 2, "parcel_id"?: 3, "line_id"?: 1, "crop_id"?: 4, "plant_nursery_id"?: 5, "action": "plante la vie", "comment": "Adding some plant", "status": "PLANT", "auto": false }` | Create a log |
| PATCH | `/log` | `{ "author_id"?: 2, "garden_id"?: 2, "parcel_id"?: 3, "line_id"?: 1, "crop_id"?: 4, "plant_nursery_id"?: 5, "action"?: "plante la vie", "comment"?: "Adding some plant", "status"?: "PLANT", "auto"?: false }` | Edit a log |
| GET | `/log` | `{ "author_id"?: 2, "garden_id"?: 2, "parcel_id"?: 3, "line_id"?: 1, "crop_id"?: 4, "plant_nursery_id"?: 5 }` | Get log with id |

## Contributor Endpoints

| Method | Route | Body | Description |
| --- | --- | --- | --- |
| POST | `/contributor` | `{ "user_id": 3, "garden_id": 2, "admin": true }` | Create a contributor |
| PATCH | `/contributor` | `{ "user_id": 3, "garden_id": 2, "admin": false }` | Edit a contributor |
| DELETE | `/contributor` | `{ "user_id": 3, "garden_id": 2 }` | Delete a contributor |
| GET | `/contributor` | `{ "user_id": 3, "garden_id": 2 }` | Get a contributor |
| GET | `/contributor/garden` | `{ "garden_id": 2 }` | Get all contributors in a garden |
| GET | `/contributor/user` | `{ "user_id": 3 }` | Get all gardens with user |
