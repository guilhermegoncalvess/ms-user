This repository is part of my final graduation project that aimed to develop a prototype system for e-commerce based on microservices.

#### Problem Description

What requirements are needed to create and develop cloud-native software systems based on microservices architecture?

#### Domain Description

The e-commerce application is a software system that acts as part of a set of services that contribute to the availability and access to data that simulate the process of listing, selecting and purchasing products. The application has domains related to the  aspects of e-commerce sales and purchases, such as User domains, Product Catalog, Shopping Cart and Orders.

<div align="center">
  
![image](./docs/businessCapability/EN-businessCapability.drawio.png)

</div>


Identifier    | Domain  | Business Capabilities 
-----------   | ------- | :------
BC1           | User    | Responsible for creating, authenticating, searching, editing and removing users.
BC2           | Catalog | Responsible for creating, searching, editing and removing products.
BC3           | Cart    | Responsible for grouping products selected by the user, total quantity of selected products and total cost of selected products.
BC4           | Order   | Module responsible for sending an order confirmation to a user. This module must send the description of each product, quantity of selected products and total cost of selected products in a user's cart.

In line with the business responsibilities of each domain, some e-commerce system requirements can be highlighted in Table 2.

Identifier  | Requirements Description
---------   | :------
R1          | The system must register users.
R2          | The system must be able to create products.
R3          | A user can insert products with their respective quantity in the cart.
R4          | A user's shopping cart must contain all products selected by the user, as well as the quantity of the corresponding products and the total cost of the products selected by the user.
R5          | A user can confirm an order and must receive an email with the order information.

Proposed Architecture Prototype


Technologies
NodeJS, Express, Python, gRPC, SMTP, Docker, Kubernetes, Github Actions, C4 Model, Google Cloud Platform (GCP), Google Cloud SQL, Google Kubernetes Engine(GKE), Google Cloud Client Libraries, Google Cloud PubSub, MongoDB Atlas.
