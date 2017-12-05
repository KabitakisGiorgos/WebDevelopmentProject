/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 *
 * @author George
 */
@WebServlet(urlPatterns = {"/myServlet"})
public class myServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if (request.getParameter("action") != null && request.getParameter("action").equals("searchUserName")) {
            if (request.getParameter("UserName") != null) {
                String Name = request.getParameter("UserName");
                Pattern userName = Pattern.compile("[A-Za-z0-9]{8,}");
                Matcher m = userName.matcher(request.getParameter("UserName"));
                if (m.matches()) {//Regex check ok
                    //here check the database
                    try {
                        if (UserDB.checkValidUserName(Name)) {
                            //edo den to brisksei mesa stin basi ara mporei na proxorisei
                            //  epistefoyme string sostou
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("1");
                        } else {
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("0");
                            //edo to briseki mesa sti basi
                            //ara epistrefei kapoio error poy to xeirizetai o client
                        }
                    } catch (ClassNotFoundException e) {
                    }
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("wrongInput");
                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("searchUserEmail")) {
            if (request.getParameter("UserEmail") != null) {
                String Email = request.getParameter("UserEmail");
                Pattern userEmail = Pattern.compile("[A-Za-z0-9._.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
                Matcher m = userEmail.matcher(Email);
                if (m.matches()) {
                    try {
                        if (UserDB.checkValidEmail(Email)) {//den briksei edo to email ara mporei na to prosthesei
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("1");
                        } else {
                            response.setStatus(200);
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("0");
                        }
                    } catch (ClassNotFoundException e) {

                    }
                } else {
                    response.setStatus(400);
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("wrongInput");
                }
            }
        } else {
            //all the others situsations
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
