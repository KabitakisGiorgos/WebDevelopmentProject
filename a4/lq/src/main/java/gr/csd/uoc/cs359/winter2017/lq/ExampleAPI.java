/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.csd.uoc.cs359.winter2017.lq;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import java.util.List;

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

////        // Check initiatives
//        Initiative initiative = new Initiative();
//        initiative.setCreator("Giorgoskmp");
//        initiative.setTitle("Halting Problem");
//        initiative.setCategory("Computability");
//        initiative.setDescription("In computability theory, the halting problem is the problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running or continue to run forever.");
//        initiative.setStatus(2);
//        InitiativeDB.addInitiative(initiative);
//        initiative.setCategory("1");
//        InitiativeDB.updateInitiative(initiative);
//        InitiativeDB.getInitiative(35).setCategory("TROLL");
//        InitiativeDB.updateInitiative(InitiativeDB.getInitiative(35));
//        System.out.println(InitiativeDB.getInitiative(35).toString());
//        int initID = initiative.getId();
//
//        Vote vote = new Vote();
//        vote.setUser("turing");
//        vote.setInitiativeID(initID);
//        vote.setVote(false, true);
//        System.out.println(vote);
//        VoteDB.addVote(vote);
//
//        vote.setVote(true, true);
//        VoteDB.updateVote(vote);
//
//        // Get upvotes
//        List<Vote> votes = VoteDB.getVotesWithStatus(1);
//        i = 0;
//        for (Vote current : votes) {
//            System.out.println("vote:" + i++);
//            System.out.println(current);
//        }
//
//        // Get Initiatives WITH STATUS 0
       InitiativeDB.deleteInitiative(39);

        List<Initiative> initiatives = InitiativeDB.getAllInitiatives();
        int i = 0;
        for (Initiative current : initiatives) {
            System.out.println("initiative:" + i++);
            System.out.println(current);
        }

    }
}
