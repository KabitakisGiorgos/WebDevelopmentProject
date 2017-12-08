/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 *
 * @author George
 */
@WebServlet(urlPatterns = {"/VoteServlet"})
public class VoteServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (request.getParameter("action") != null) {
            if (request.getParameter("action").equals("NewPoll")) {
                if (request.getParameter("category") != null && request.getParameter("title") != null && request.getParameter("description") != null && request.getParameter("creator") != null) {
                    try {
                        Initiative initiative = new Initiative(request.getParameter("creator"), request.getParameter("category"), request.getParameter("title"), request.getParameter("description"), 0);
                        InitiativeDB.addInitiative(initiative);
                    } catch (ClassNotFoundException e) {

                    }
                    response.setStatus(200);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("1");
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMising");
                }
            } else if (request.getParameter("action").equals("UserInitiativeList")) {
                if (request.getParameter("input") != null) {
                    try {
                        List<Initiative> initiatives = InitiativeDB.getInitiatives(request.getParameter("input"));
                        response.setStatus(200);
                        response.setContentType("text/xml");
                        PrintWriter out = response.getWriter();
                        if (initiatives.isEmpty()) {
                            out.write("0");
                        } else {
                            for (Initiative current : initiatives) {
                                out.write(current.getId() + "<>");
                                out.write(current.getCreator() + "<>");
                                out.write(current.getTitle() + "<>");
                                out.write(current.getCategory() + "<>");
                                out.write(current.getDescription() + "<>");
                                out.write(current.getStatus() + "<>");
                                out.write("<+>");
                            }//check if no polls print message
                        }
                    } catch (ClassNotFoundException e) {

                    }
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMising");
                }         //here another action
            } else if (request.getParameter("action").equals("deletePoll")) {
                //check number is given and exists
                if (request.getParameter("id") != null) {
                    try {
                        InitiativeDB.deleteInitiative(Integer.parseInt(request.getParameter("id")));
                    } catch (ClassNotFoundException e) {

                    }
                    response.setStatus(200);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("1");
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMising");
                }
            } else if (request.getParameter("action").equals("update")) {
                if (request.getParameter("id") != null && request.getParameter("category") != null && request.getParameter("title") != null && request.getParameter("description") != null) {
                    Initiative mypoll = null;
                    try {
                        mypoll = InitiativeDB.getInitiative(Integer.parseInt(request.getParameter("id")));
                        mypoll.setCategory(request.getParameter("category"));
                        mypoll.setTitle(request.getParameter("title"));
                        mypoll.setDescription(request.getParameter("description"));
                        InitiativeDB.updateInitiative(mypoll);
                    } catch (ClassNotFoundException e) {

                    }
                    response.setStatus(200);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("1");
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMising");
                }
            } else if (request.getParameter("action").equals("setExpireDate")) {
                if (request.getParameter("id") != null && request.getParameter("date") != null) {
                    Initiative mypoll = null;
                    try {
                        mypoll = InitiativeDB.getInitiative(Integer.parseInt(request.getParameter("id")));
                        mypoll.setStatus(1);
                        mypoll.setExpires(new Date(request.getParameter("date")));
                        InitiativeDB.updateInitiative(mypoll);
                    } catch (ClassNotFoundException e) {

                    }
                    response.setStatus(200);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("1");
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("InputsMising");
                }
            }
        } else {
            response.setStatus(400);
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            out.write("NoActionGiven");
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
