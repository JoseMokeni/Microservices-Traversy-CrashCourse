import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  // Start services
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    // Simulate user creation
    let newUser = await UserService.call("user.createUser", {
      username: "John",
      email: "john@gmail.com",
    });
    console.log("New user created:", newUser);

    newUser = await UserService.call("user.createUser", {
      username: "Jane",
      email: "jane@gmail.com",
    });
    console.log("New user created:", newUser);

    // Get all users
    let users = await UserService.call("user.getUsers");
    console.log("All users:", users);

    // Find users test without passing params
    users = await UserService.call("user.findUsers", {
      email: "jane",
    });
    console.log("Users found:", users);

    // ===============END USER==================

    // ===============BEGIN EMAIL==================
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform",
      content: "Thank you for signing up",
    });

    console.log(emailResult);

    //================END EMAIL=================

    //================BEGIN AUTH=================
    let authResult;

    // Simulate successful auth
    authResult = await AuthService.call("auth.authUser", {
      username: "admin",
      password: "password",
    });
    console.log(authResult);

    // Simulate failed auth
    authResult = await AuthService.call("auth.authUser", {
      username: "josemokeni",
      password: "josemokeni",
    });
    console.log(authResult);
  } catch (error) {
    console.error("An error occured:", error);
  } finally {
    UserService.stop();
    EmailService.stop();
    AuthService.stop();
  }
}

startApp();
