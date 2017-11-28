/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import gr.csd.uoc.cs359.winter2017.lq.model.User;

/**
 *
 * @author papadako
 */
public class ExampleAPI {

    public static void main(String[] args) throws ClassNotFoundException {

//        User turing = new User();
User myuser = UserDB.getUser("kalimera");
//        myuser.setInterests("Trying to fix the trolling db");
//        myuser.setInfo("I hope you follow my path...");
//        myuser.setEmail("gnirut@csd.uoc.gr");
//        UserDB.updateUser(myuser);

        System.out.println(UserDB.getUsers());
//          
//        UserDB.deleteUser("bloom312");
//        UserDB.deleteUser("dsadasds");
//           UserDB.deleteUser("PtyxioNOT");
//        UserDB.deleteUser("Giorgoskmp1");
//        UserDB.deleteUser("Giorgoskmp2");
//        UserDB.deleteUser("kalimera");
//        System.out.println(UserDB.getUsers());

        if (UserDB.checkValidUserName("KALIMERA")) {
            // You can be a new Turing!
            System.out.println("Well, Turing is gone for a long time now!");
            System.out.println("Hope we find a new one in this 2017 class!");
        } else {
            System.out.println("ara ypiarxei thema");
        }
    }
}
