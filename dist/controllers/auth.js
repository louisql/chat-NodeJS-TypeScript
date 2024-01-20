var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; //using bcrypt for hash
import User from '../models/user';
import AppError from '../utils/app-error';
var JWTSECRET = process.env.JWT_SECRET;
//User registration
export function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, password, exitingUser, hashedPassword, newUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                    return [4 /*yield*/, User.findOne({ email: email })];
                case 1:
                    exitingUser = _b.sent();
                    if (exitingUser) {
                        return [2 /*return*/, res.status(400).json({ message: 'User already exists.' })];
                    }
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _b.sent();
                    newUser = new User({ username: username, email: email, password: hashedPassword });
                    return [4 /*yield*/, newUser.save()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.status(201).json({ message: 'User registered successfully' })];
                case 4:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// User Login
export function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, passwordMatch, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, User.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new AppError('Invalid credentials', 401); // 401 Unauthorized
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 2:
                    passwordMatch = _b.sent();
                    if (!passwordMatch) {
                        throw new AppError('Invalid credentials', 401); // 401 Unauthorized
                    }
                    if (!JWTSECRET) {
                        throw new Error('JWT secret is not defined in the environment variables');
                    }
                    token = jwt.sign({ userId: user._id, email: user.email }, JWTSECRET, {
                        expiresIn: '1h',
                    });
                    return [2 /*return*/, res.status(200).json({ message: 'Login successful', token: token })];
                case 3:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Protected route - User Profile
export function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userData, userProfile, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userData = req.user;
                    return [4 /*yield*/, User.findById(userData.userId)];
                case 1:
                    userProfile = _a.sent();
                    if (!userProfile) {
                        throw new AppError('User profile not found', 404);
                    }
                    return [2 /*return*/, res.json({ user: userProfile })];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    throw new AppError('Internal server error', 500);
                case 3: return [2 /*return*/];
            }
        });
    });
}
