/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import gr.csd.uoc.cs359.winter2017.lq.model.User;

/**
 *
 * @author George
 */
@WebServlet(urlPatterns = {"/SiteFunctions"})
public class SiteFunctions extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        response.setContentType("text/html;charset=UTF-8");
        if (request.getParameter("action") != null && request.getParameter("action").equals("login")) {
            if (request.getParameter("username") != null && request.getParameter("password") != null) {
                //checkaroyme an iparxei to onoma arxika
                try {
                    if (!UserDB.checkValidUserName(request.getParameter("username"))) {//iparxei to onoma
                        User myUser = UserDB.getUser(request.getParameter("username"));
                        if (myUser.getPassword().equals(request.getParameter("password"))) {
                            //tairiazei to onoma me to password
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("1");
                        } else {//ebale lathos password
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("WrongPassword");
                        }
                    } else {//den iparxei o xristis
                        response.setStatus(200);
                        response.setContentType("text/xml");
                        PrintWriter out = response.getWriter();
                        out.write("notExistentUser");
                    }
                } catch (ClassNotFoundException e) {
                }
            } else {
                //return 400 not all fields are covered
                response.setStatus(400);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                out.write("notAllfieldscovered");
            }
        } else if (false) {//another sevice here-action

        } else {//the service u ask isnt provided
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
