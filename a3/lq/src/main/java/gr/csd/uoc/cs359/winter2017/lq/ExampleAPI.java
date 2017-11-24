/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;

/**
 *
 * @author papadako
 */
public class ExampleAPI {

    /**
     * An example of adding a new member in the database. Turing is a user of
     * our system
     *
     * @param args the command line arguments
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) throws ClassNotFoundException {


        UserDB.deleteUser("turing1");
        UserDB.deleteUser("aksogkid");
        UserDB.deleteUser("turinggggg");
        UserDB.deleteUser("dsadasds");
        UserDB.deleteUser("Giorgoskmp");
        UserDB.deleteUser("Giorgoskmp1");
        UserDB.deleteUser("Giorgoskmp2");
        UserDB.deleteUser("kalimera");
        System.out.println(UserDB.getUsers());

//        System.out.println(UserDB.getUser("dsadasds"));
        if (UserDB.checkValidUserName("turinggggg")) {
            // You can be a new Turing!
            System.out.println("Well, Turing is gone for a long time now!");
            System.out.println("Hope we find a new one in this 2017 class!");
        }
    }
}
