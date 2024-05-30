import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";

async function startApp() {
  // Start services
  await UserService.start();
  await EmailService.start();

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
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform",
      content: "Thank you for signing up",
    });

    console.log(emailResult);
  } catch (error) {
    console.error("An error occured:", error);
  } finally {
    UserService.stop();
    EmailService.stop();
  }
}

startApp();
