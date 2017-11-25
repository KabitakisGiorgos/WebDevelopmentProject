/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.servlet.http.HttpSession;
import gr.csd.uoc.cs359.winter2017.lq.db.UserDB;
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author George
 */
@WebServlet(urlPatterns = {"/SubmitForm"})
public class SubmitForm extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);//check it here if needed
        User newUser = (User) session.getAttribute("newUser");
        response.setContentType("text/html;charset=UTF-8");
        if (newUser == null) {
            newUser = new User();
            session.setAttribute("newUser", newUser);
        }
        if (request.getParameter("action") != null && request.getParameter("action").equals("submit")) {
            if (request.getParameter("username") != null
                    && request.getParameter("email") != null
                    && request.getParameter("password") != null
                    && request.getParameter("confirm_password") != null
                    && request.getParameter("name") != null
                    && request.getParameter("surname") != null
                    && request.getParameter("date") != null
                    && request.getParameter("country") != null
                    && request.getParameter("city") != null
                    && request.getParameter("job") != null) {

                Pattern userName = Pattern.compile("[A-Za-z0-9]{8,}");
                Pattern Email = Pattern.compile("[A-Za-z0-9._.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
                Pattern Pass = Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,10}$");
                Pattern name = Pattern.compile(".{0,20}");
                Pattern surname = Pattern.compile(".{4,20}");
                Pattern city = Pattern.compile(".{2,20}");
                Pattern address = Pattern.compile(".{2,40}");
                Pattern job = Pattern.compile(".{2,20}");

                Matcher m = userName.matcher(request.getParameter("username"));
                Matcher m1 = Email.matcher(request.getParameter("email"));
                Matcher m2 = Pass.matcher(request.getParameter("password"));
                Matcher m3 = Pass.matcher(request.getParameter("confirm_password"));
                Matcher m4 = name.matcher(request.getParameter("name"));
                Matcher m5 = surname.matcher(request.getParameter("surname"));
                Matcher m6 = city.matcher(request.getParameter("city"));
                Matcher m7 = job.matcher(request.getParameter("job"));
                Matcher m8 = address.matcher(request.getParameter("address"));
                if (request.getParameter("address") != null && !m8.matches()) {
                    response.setStatus(400);//den tairiazoyne ta regexes
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("regexproblem");
                } else if (!m.matches() || !m1.matches() || !m2.matches() || !m3.matches() || !m4.matches() || !m5.matches() || !m6.matches() || !m7.matches()) {

                    response.setStatus(400);//den tairiazoyne ta regexes
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("regexproblem");
                } else if (!request.getParameter("password").equals(request.getParameter("confirm_password"))) {
                    response.setStatus(400);//different password verify
                    response.setContentType("text/xml");
                    PrintWriter out = response.getWriter();
                    out.write("10");
                } else {
                    try {
                        if (!UserDB.checkValidEmail(request.getParameter("email")) || !UserDB.checkValidUserName(request.getParameter("username"))) {
                            response.setStatus(400);//kapos mpike sstin basi iparxon onoma i email ara skaei
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("alreadyinuse");
                        } else {//add user after this and here control the not required fields check
                            newUser.setUserName(request.getParameter("username"));
                            newUser.setEmail(request.getParameter("email"));
                            newUser.setPassword(request.getParameter("password"));
                            newUser.setFirstName(request.getParameter("name"));
                            newUser.setLastName(request.getParameter("surname"));
                            newUser.setBirthDate(request.getParameter("date"));
                            newUser.setCountry(request.getParameter("country"));
                            newUser.setTown(request.getParameter("city"));
                            if (request.getParameter("address") != null) {
                                newUser.setAddress(request.getParameter("address"));
                            }
                            newUser.setOccupation(request.getParameter("job"));
                            newUser.setGender(request.getParameter("gender"));
                            if (request.getParameter("interests") != null) {
                                newUser.setInterests(request.getParameter("interests"));
                            }
                            if (request.getParameter("info") != null) {
                                newUser.setInfo(request.getParameter("info"));
                            }
                            UserDB.addUser(newUser);
                            response.setStatus(200);//ola kala edo
                            response.setContentType("text/xml");
                            PrintWriter out = response.getWriter();
                            out.write("1");
                        }
                    } catch (ClassNotFoundException e) {

                    }
                }
            } else {
                response.setStatus(400);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                out.write("requiredfieldsempty");
                //return bad input or something cause the required fields are empty
            }
        } else {
            response.setStatus(400);
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            out.write("umessedthathard");
            //other service or return error cause asked for wrong action
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
