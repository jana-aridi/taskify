# taskify_react

Project Title:
--------------
Application Name: Taskify                                  
Slogan: From To-Do to Ta-Da!


Project Description:
---------------------
Taskify is a task management tool crafted for quick deployment and higher efficiency in the workspace and daily-life. It provides strong features for individuals and workspaces, ensuring effective task management and collaboration. It maximizes employees’ potentials and allows the creation of a collaborative and goal-oriented environment.

* User Hierarchy:
  -	Company Admin (or Workspace Admin): Manages a particular company/workspace. They are typically the ones who create the workspace upon sign up, and can invite users to join. They can manage users within their workspace.
  -	Regular User: Belongs to a workspace. They can add and delete tasks, and collaborate with other users within the same workspace (minus admins, they cannot assign tasks for the admin).

* Becoming an Admin:
  - When a user first signs up, if he/she creates a workspace, they automatically become the 'Company Admin' for that workspace. They can then invite other users to join this workspace. Those invited users become 'Regular Users'. There's only one 'Super Admin', possibly the platform owner or a designated administrator. (On sign up you have an option to create a workspace or join a workspace).


Running Instructions:
---------------------
In the main terminal, run 'npm start' to run concurrently the api and the client servers.       


Key Features:
--------------

  1.	Task Management:
  
    Regular users can add, update, delete, and complete tasks. Upon completion, sound effects play, and confetti animations appear.
    Tasks are displayed with other assignees. 
  
  2.	Team Collaboration: 
  
    Regular users can collaborate on tasks with others within the same workspace, they can also create individual tasks for themselves.
  
  3.	Workspace Management:
  
    Company Admins can invite users to their workspace. 
  
  4.	User Management:
  
    Company Admins can manage users within their workspace.
    Super Admins can manage all users across the platform, including adding, editing, and deleting users. (to be implemented)
  
  5.	Sign Up & Workspace Creation:
  
    Any user can sign up. If they create a workspace during sign-up, they become a Company Admin for that workspace.
    If on sign up the user didn't choose to be an admin, on login they are supposed to join a workspace through entering the unique ID of the workspace shared by the admin.

Tech Stack:
-----------

Frontend: React, Bootstrap and MaterialUI     
Backend: Node.js and JavaScript    
Database: MongoDB to manage task, workspace and user data      
Authentication: JWT-based approach for authentication and session management & JOI to ensure password complexity. 

