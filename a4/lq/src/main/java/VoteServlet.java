/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2017.lq.db.InitiativeDB;
import gr.csd.uoc.cs359.winter2017.lq.model.Initiative;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
            } else if (false) {
                //here another action
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
