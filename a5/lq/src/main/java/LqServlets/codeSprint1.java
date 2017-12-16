/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LqServlets;

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.db.VoteDB;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import gr.csd.uoc.cs359.winter2017.lq.model.Vote;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author George
 */
@WebServlet(name = "codeSprint1", urlPatterns = {"/codeSprint1"})
public class codeSprint1 extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        if (request.getParameter("action") != null) {
            if (request.getParameter("action").equals(("SearchInitiatives"))) {
                if (request.getParameter("username") != null) {
                    Pattern userName = Pattern.compile("[A-Za-z0-9]{8,}");
                    Matcher m = userName.matcher(request.getParameter("username"));
                    if (!m.matches()) {
                        response.setStatus(400);//den tairiazoyne ta regexes
                        response.setContentType("text/xml");
                        PrintWriter out = response.getWriter();
                        out.write("regexproblem");
                    } else {
                        try {
                            List<Initiative> initiatives = InitiativeDB.getInitiatives(request.getParameter("username"));
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            if (initiatives.isEmpty()) {
                                out.write("0");
                            } else {
                                for (Initiative current : initiatives) {
                                    if (current.getStatus() == 0) {
                                        continue;
                                    }
                                    out.write(current.getId() + "<>");
                                    out.write(current.getCreator() + "<>");
                                    out.write(current.getTitle() + "<>");
                                    out.write(current.getCategory() + "<>");
                                    out.write(current.getDescription() + "<>");
                                    out.write(current.getStatus() + "<>");
                                    List<Vote> UsersVotes = VoteDB.getVotes(request.getParameter("activeUser"));//o xristis o dikos mas edo mesa
                                    Vote myvote = null;

                                    for (Vote current1 : UsersVotes) {
                                        if (current1.getInitiativeID() == current.getId()) {
                                            myvote = current1;
                                            break;
                                        }
                                    }
                                    if (myvote != null) {
                                        out.write(myvote.getVote() + "<>");
                                    } else {
                                        out.write("-1<>");
                                    }
                                    out.write("<+>");
                                }
                            }
                        } catch (ClassNotFoundException e) {

                        }
                    }
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMissing");
                }
            }
        } else {
            response.setStatus(400);
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            out.write("UnknownError");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
