"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var colors_1 = __importDefault(require("colors"));
var db_config_1 = __importDefault(require("./config/db.config"));
var logger_utils_1 = __importDefault(require("./utils/logger.utils"));
dotenv_1.default.config({ path: "./src/config/config.env" });
(0, db_config_1.default)();
var notes_route_1 = __importDefault(require("./routes/notes.route"));
var users_route_1 = __importDefault(require("./routes/users.route"));
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/notes", notes_route_1.default);
app.use("/api/v1/users", users_route_1.default);
app.use("/api/v1/auth", auth_route_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    return logger_utils_1.default.info(colors_1.default.yellow.bold("Server running in " + process.env.NODE_ENV + " mode on port " + PORT));
});
