## StudyNotion
Study Notion is an EdTech (Education Technology) web application developed using the MERN stack. It is an innovative EdTech platform where instructors can upload their courses and track their progress through visually engaging pie charts , thanks to Chart.js npm package. The website is built on ReactJS, TailwindCSS, while its backend supported by by NodeJS (ExpressJs) and MongoDB database. For payment processing, StudyNotion employs Razorpay and media data is securely stored on Cloudinary servers. Apart from this , the website incorporates Dicebear's API to automatically generate unique profile pictures for users showing initials of their name and surname.

## System Architecture Diagram :
![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/0fff0d40-6e52-48ce-b762-11f2871e3e36)

## Special Features :
- **User Authentication:** Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their profiles with ease.
* **Courses and Lessons:** Instructors can create and edit created courses. Students can enroll in courses, access course materials, and track their progress.
+ **Progress Tracking:** Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and assignments, and overall course progress.
- **Payment Integration:** Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services using various payment methods supported by Razorpay.
* **Cloud-based media management**: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
+ **Instructor Dashboard:** Instructors have access to a comprehensive dashboard to view information about their courses, students, and income. The dashboard provides charts and visualizations to present data clearly and intuitively. Instructors can monitor the total number of students enrolled in each course, track course performance, and view their income generated from course sales.

## Technologies Used :
**For Frontend :**
1. *ReactJS* : A popular JavaScript library for building user interfaces.
2. *TailwindCSS* : It is a styling framework that help make the user interface look good and responsive. 
3. Additionally , we have also used some npm packages to add extra functionality to the frontend.

**For Backend :**
1. *Node.js*: Node.js is used as the primary framework for the back end.
2. *MongoDB*: MongoDB is used as the primary database, providing a flexible and scalable data storage solution.
3. *Express.js*: Express.js is used as a web application framework, providing a range of features and tools for building web applications.
4. *JWT*: JWT (JSON Web Tokens) are used for authentication and authorization, providing a secure and reliable way to manage user credentials.
5. *Bcrypt*: Bcrypt is used for password hashing, adding an extra layer of security to user data.
6. *Mongoose*: Mongoose is used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.

**Payment Processing :** *Razorpay* , it provides various comprehensive payment solutions, including payment gateway services, subscriptions, and invoicing

**Media Data Storage :** *Cloudinary* , it offers comprehensive solutions for image and video uploading, storage, transformation, and delivery 

**Profile Picture Generation :** *Dicebear API* , used to create unique , user-specific avatars based on various styles and themes.


## Screenshots :
![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/3dcad84a-85df-4d40-9c38-4017fca72488)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/bd72ec86-0b04-41d3-80ae-30d4b6c828f4)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/3f013fd2-9058-406f-85bd-2e24ffe8acfa)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/003196fc-4a21-49ae-80c0-421c6e74ad6a)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/8feae6a4-51fe-4003-8920-fa172cea1ac7)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/4bcb88c0-e855-49fe-a4bc-4cec8cf2119b)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/92b5ae02-434b-4754-9d42-4f6cd668f9d6)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/1583ac77-daa6-4fe6-9804-f8d872204786)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/b4680581-7e1c-4f14-be12-a7c635c7a114)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/394ce5e6-c37b-402e-8f35-b8ba12f165f7)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/26c5f16c-39b2-411b-a145-abd6b24e225a)

![image](https://github.com/DivyamVJ0901/StudyNotion/assets/105193740/6e6697be-63ed-4b27-ab91-a9298d38c2d3)


## Important points to remember :
- First of all you have to create a categories like web dev , app dev , dsa etc. otherwise courses cannot be added . And to create it , you have to login as an Admin.
- To create an Admin account first sign up with a student or instructor account then go to your Database under the users model and change that 'accountType' to 'Admin'.
- Entire backend code is in SERVER folder.


## How to install ? 
1. Clone the repository to your local machine :
    ```sh
    git clone https://github.com/DivyamVJ0901/StudyNotion.git
    ```

2. Install the required packages :
    ```sh
    cd StudyNotion
    npm install

    cd server
    npm install
    ```

3. Set up the environment variables :
    Create a .env file in the root directory and in the ./SERVER and add all the requirement        environment variables. Required environment variables are :
   
    JWT_SECRET =
   
    FOLDER_NAME = (cloudinary folder name)
   
    RAZORPAY_KEY =
   
    RAZORPAY_SECRET =
      
    MONGODB_URL =
   
    PORT =
   
    CLOUD_NAME =
   
    API_KEY =
   
    API_SECRET =
   
    MAIL_HOST =
   
    USER =
   
    PASS =
5. Start the development server :
    ``` sh
    npm run dev
    ```     
6. Open the project in your browser at http://localhost:3000 to view your project

You can add your own `tailwind.config.js` file to customize your Tailwind setup.

## Contributions

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.



