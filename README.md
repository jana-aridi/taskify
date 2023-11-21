# taskify_react

Project Title:
--------------
Application Name: Taskify                                  
Slogan: From To-Do to Ta-Da!


Project Description:
---------------------
Taskify is a task management tool crafted for quick deployment and higher efficiency in the workspace and daily-life. It provides strong features for individuals and workspaces, ensuring effective task management and collaboration. It maximizes employees’ potentials and allows the creation of a collaborative and goal-oriented environment.

* User Hierarchy:
  -	Super Admin: Oversees all companies and has rights to manage every user across the platform.
  -	Company Admin (or Workspace Admin): Manages a particular company/workspace. They are typically the ones who create the workspace upon sign up, and can invite users to join. They can view tasks and manage users within their workspace.
  -	Regular User: Belongs to a workspace. They can add, update, and delete tasks, and collaborate with other users within the same workspace (minus admins, they cannot assign tasks for the admin).

* Becoming an Admin:
  - When a user first signs up, if he/she creates a workspace, they automatically become the 'Company Admin' for that workspace. They can then invite other users to join this workspace. Those invited users become 'Regular Users'. There's only one 'Super Admin', possibly the platform owner or a designated administrator. (On sign up you have an option to create a workspace or join a workspace).


Running Instructions:
---------------------
In the main terminal, enter the api directory through 'cd api' and run 'nodemon index.js' in order to start the backend server.     
For the frontend enter client directory through 'cd client' in another terminal, and run 'npm start'.       


Key Features:
--------------

  1.	Task Management:
  
    Regular users can add, update, delete, and complete tasks. Upon completion, sound       effects play, and confetti animations appear.
    Tasks are displayed with due date along with viewing other assignees.
    Tasks could have subtasks and a progress bar is displayed along the way as subtasks are completed, when subtasks are all done the main task is marked as completed automatically. (Tasks have a ‘creator’ attribute that marks who created it, by ID)
  
  2.	Team Collaboration: 
  
    Regular users can collaborate on tasks and assign tasks to others within the same workspace.
  
  3.	Workspace Management:
  
    Company Admins can invite users to their workspace. They can also view (but not edit tasks they didn’t assign) all tasks within their workspace. Workspace managers can add tasks to employees (they are not included)
  
  4.	User Management:
  
    Company Admins can manage users within their workspace.
    Super Admins can manage all users across the platform, including adding, editing, and deleting users.
  
  5.	Sign Up & Workspace Creation:
  
    Any user can sign up. If they create a workspace during sign-up, they become a Company Admin for that workspace.

Tech Stack:
-----------

Frontend: React, and MaterialUI     
Backend: Node.js and JavaScript    
Database: MongoDB to manage task, workspace and user data      
Authentication: JWT-based approach for authentication and session management & JOI to ensure password complexity. 

