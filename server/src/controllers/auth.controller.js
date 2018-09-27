import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model";
import helpers from "../helpers";
const auth = require("../helpers/auth");
const { SECRET, JWT_EXPIRATATION } = require("../../config.json");

const api = Router();
api.get("/logout", auth.optional, (req, res) => {
  req.logout();
  res.send(null);
});

api.post("/login", auth.optional, (req, res, next) => {
  if (req.body.email && req.body.password) {
    helpers.common.log("start to log in...", "green");
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res
            .status(400)
            .send({
              message: "Can not find user to login"
            })
            .end();
        } else {
          User.compare(user.password, req.body.password, function(result) {
            if (result) {
              helpers.common.log(
                `login with email: ${req.body.email}`,
                "green"
              );
              jsonwebtoken.sign(
                { email: user.email, id: user._id, username: user.username },
                SECRET,
                {
                  algorithm: "HS256",
                  expiresIn: JWT_EXPIRATATION
                },
                (err, token) => {
                  if (err)
                    return res
                      .status(400)
                      .send({
                        err
                      })
                      .end();
                  return res.status(200).send({
                    user,
                    token
                  });
                }
              );
            } else {
              res
                .status(400)
                .send({
                  message: "Password is not correct."
                })
                .end();
            }
          });
        }
      })
      .catch(err => {
        res
          .status(400)
          .send({
            message: "Can not find user to login."
          })
          .end();
      });
  } else {
    res
      .status(400)
      .send({
        message: "Email and password are required."
      })
      .end();
  }
});
api.post("/register", auth.optional, (req, res, next) => {
  if (
    req.body.username &&
    req.body.email &&
    req.body.password &&
    req.body.passwordConf
  ) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      return res.status(500).send({
        status: "failed",
        message: "Password do not match."
      });
    }
    const userData = {
      email: req.body.email,
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };
    const user = new User(userData);
    user.save((err, u) => {
      if (err) {
        if (err.code === 11000)
          return res.status(500).send({
            status: "failed",
            message: "E-mail is duplicated."
          });
        else return res.status(500).send(err);
      }
      return res.status(200).send({
        status: "success",
        user: u
      });
    });
  } else {
    res.status(500).send({
      status: "failed",
      message: "Required fields are empty."
    });
  }
  return false;
});

module.exports = api;
