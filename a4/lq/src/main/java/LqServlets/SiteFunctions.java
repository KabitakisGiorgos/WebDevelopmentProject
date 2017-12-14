package LqServlets;

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
import gr.csd.uoc.cs359.winter2017.lq.model.User;
import java.util.List;
import javax.servlet.http.HttpSession;

/**
 *
 * @author George
 */
@WebServlet(urlPatterns = {"/SiteFunctions"})
public class SiteFunctions extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        User newUser = null;

        response.setContentType("text/html;charset=UTF-8");
        if (request.getParameter("action") != null && request.getParameter("action").equals("update")) {
            newUser = (User) session.getAttribute("newUser");
            try {
                User updateUser = UserDB.getUser(newUser.getUserName());
                updateUser.setFirstName(request.getParameter("input1"));
                updateUser.setLastName(request.getParameter("input2"));
                updateUser.setBirthDate(request.getParameter("input3"));
                updateUser.setOccupation(request.getParameter("input4"));
                updateUser.setCountry(request.getParameter("input5"));
                updateUser.setTown(request.getParameter("input6"));
                updateUser.setAddress(request.getParameter("input7"));
                updateUser.setInterests(request.getParameter("input8"));
                updateUser.setInfo(request.getParameter("input9"));
                updateUser.setGender(request.getParameter("input10"));

                UserDB.updateUser(updateUser);

                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                out.write("1");
            } catch (ClassNotFoundException e) {

            }

        } else if (request.getParameter("action") != null && request.getParameter("action").equals("email") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");//fixed
            response.setStatus(200);
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            try {
                out.write(UserDB.getUser(newUser.getUserName()).getEmail());

            } catch (ClassNotFoundException e) {

            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("Fname") && request.getParameter("input") != null) {

            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getFirstName());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("Lname") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getLastName());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("Bdate") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getBirthDate());

                } catch (ClassNotFoundException e) {
                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("gender") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getGender().toString());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("country") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getCountry());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("city") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getTown());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("address") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getAddress());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("job") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getOccupation());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("interests") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getInterests());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("infos") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            if (request.getParameter("input").equals("0")) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                try {
                    out.write(UserDB.getUser(newUser.getUserName()).getInfo());

                } catch (ClassNotFoundException e) {

                }
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("name") && request.getParameter("input") != null) {
            newUser = (User) session.getAttribute("newUser");
            response.setStatus(200);//okkkkk
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            out.write(newUser.getUserName());
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("userlist")) {
            try {
                newUser = (User) session.getAttribute("newUser");
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                List<User> users = UserDB.getUsers();
                for (int i = 0; i < users.size(); i++) {
                    if (users.get(i).getUserName().equals(newUser.getUserName())) {
                        continue;
                    }
                    out.write(users.get(i).getUserName() + "^^^" + users.get(i).getEmail() + "+++++++");
                }
            } catch (ClassNotFoundException e) {

            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("logout")) {
            session.invalidate();
            response.setStatus(200);
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            out.write("closed");
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("reload")) {
            User testUser = (User) session.getAttribute("newUser");
            if (testUser != null) {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                out.write(testUser.getUserName());
            } else {
                response.setStatus(200);
                response.setContentType("text/xml");
                PrintWriter out = response.getWriter();
                out.write("NOTconnected");
            }
        } else if (request.getParameter("action") != null && request.getParameter("action").equals("login")) {
            if (request.getParameter("username") != null && request.getParameter("password") != null) {
                //checkaroyme an iparxei to onoma arxika
                try {
                    if (!UserDB.checkValidUserName(request.getParameter("username"))) {//iparxei to onoma
                        User myUser = UserDB.getUser(request.getParameter("username"));
                        if (myUser.getPassword().equals(request.getParameter("password"))) {
                            //tairiazei to onoma me to password
                            if (newUser == null) {
                                newUser = new User();
                                newUser.setUserName(request.getParameter("username"));
                                session.setAttribute("newUser", newUser);
                            }
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
