/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.model.User;
import java.util.List;
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
//        Initiative initiative = InitiativeDB.getInitiative(48);
//        initiative.setStatus(2);
//        InitiativeDB.updateInitiative(initiative);
//        int initID = initiative.getId();
//        boolean exists = false;
//        List<Vote> UsersVotes = VoteDB.getVotes("turing");
//        Vote myvote = null;
//        for (Vote current : UsersVotes) {
//            if (current.getInitiativeID() == initID) {
//                exists = true;
//                myvote = current;
//                break;
//            }
//        }
//
//        if (!exists) {
//            Vote vote = new Vote();
//            vote.setUser("turing");
//            vote.setInitiativeID(initID);
//            vote.setVote(false, true);
//            VoteDB.addVote(vote);
//        } else {
//            System.out.println("User has already Voted i ll just update his vote later");
//            myvote.setVote(false, true);
//            VoteDB.updateVote(myvote);
//        }

//        vote.setVote(false, true);
//        VoteDB.updateVote(vote);
//        System.out.println(vote);
        // Get upvotes from users (i.e. non delegators)
//        VoteDB.deleteVote(14);
//        VoteDB.deleteVote(22);
//        VoteDB.deleteVote(23);
//        VoteDB.deleteVote(24);
//        VoteDB.deleteVote(25);
//        List<Vote> votes = VoteDB.getAllVotes();
//        int i = 0;
//        for (Vote current : votes) {
//            System.out.println("vote:" + i++);
////            VoteDB.deleteVote(current.getId());
//            System.out.println(current);
//        }
        User updateUser = UserDB.getUser("turing");
        UserDB.deleteUser(updateUser);
        List<User> users = UserDB.getUsers();
        int i = 0;
        for (User current : users) {
            System.out.println(current.toString());
        }
//        List<Initiative> initiatives = InitiativeDB.getAllInitiatives();
//        i = 0;
//        for (Initiative current : initiatives) {
//            System.out.println("initiative:" + i++);
////            InitiativeDB.deleteInitiative(current.getId());
//            System.out.println(current);
//        }
    }
}
