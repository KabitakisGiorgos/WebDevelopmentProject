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

//          
        UserDB.deleteUser("Giorgoskmp2");
        UserDB.deleteUser("Giorgoskmp3");
        UserDB.deleteUser("Giorgoskmp4");
        UserDB.deleteUser("Giorgoskmp5");
        System.out.println(UserDB.getUsers());

        if (UserDB.checkValidUserName("KALIMERA")) {
            // You ca be a new Turing!
            System.out.println("Well, Turing is gone for a long time now!");
            System.out.println("Hope we find a new one in this 2017 class!");
        } else {
            System.out.println("ara ypiarxei thema");
        }
    }
}
