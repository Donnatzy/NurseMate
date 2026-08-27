// ==========================================
// NURSEMATE - SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "https://tqifwhefsemknqbmwtoy.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_tBQcJ9DjRm7zD9MRMTEabw_hB8BQGAC";


// ==========================================
// CREATE SUPABASE CLIENT
// ==========================================

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ==========================================
// TEST SUPABASE CONNECTION
// ==========================================

async function checkSupabaseConnection() {

    try {

        const { data, error } = await supabaseClient
            .from("profiles")
            .select("id")
            .limit(1);

        if (error) {

            console.error(
                "❌ Supabase connection error:",
                error
            );

            return false;
        }

        console.log(
            "✅ Supabase connected successfully!"
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Connection failed:",
            error
        );

        return false;
    }
}


// ==========================================
// GET CURRENT USER
// ==========================================

async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {

        console.error(
            "❌ Unable to get current user:",
            error
        );

        return null;
    }

    return user;
}


// ==========================================
// GET CURRENT USER PROFILE
// ==========================================

async function getCurrentProfile() {

    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {

        console.error(
            "❌ Unable to get profile:",
            error
        );

        return null;
    }

    return data;
}


// ==========================================
// CHECK IF CURRENT USER IS ADMIN
// ==========================================

async function checkIfAdmin() {

    const { data, error } = await supabaseClient
        .rpc("is_admin");

    if (error) {

        console.error(
            "❌ Admin check failed:",
            error
        );

        return false;
    }

    return data === true;
}


// ==========================================
// GET USER ROLE
// ==========================================

async function getUserRole() {

    const profile = await getCurrentProfile();

    if (!profile) {
        return null;
    }

    return profile.role;
}


// ==========================================
// SIGN UP
// ==========================================

async function signUp(email, password, fullName) {

    const {
        data,
        error
    } = await supabaseClient.auth.signUp({

        email: email,
        password: password,

        options: {
            data: {
                full_name: fullName
            }
        }

    });

    if (error) {

        console.error(
            "❌ Sign-up error:",
            error
        );

        return {
            success: false,
            error: error.message
        };
    }

    return {
        success: true,
        data: data
    };
}


// ==========================================
// LOGIN
// ==========================================

async function login(email, password) {

    const {
        data,
        error
    } = await supabaseClient.auth.signInWithPassword({

        email: email,
        password: password

    });

    if (error) {

        console.error(
            "❌ Login error:",
            error
        );

        return {
            success: false,
            error: error.message
        };
    }

    return {
        success: true,
        data: data
    };
}


// ==========================================
// LOGOUT
// ==========================================

async function logout() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        console.error(
            "❌ Logout error:",
            error
        );

        return false;
    }

    return true;
}


// ==========================================
// AUTH STATE LISTENER
// ==========================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "🔐 Auth event:",
            event
        );

        if (session) {

            console.log(
                "✅ Logged in:",
                session.user.email
            );

        } else {

            console.log(
                "ℹ️ No user currently logged in."
            );
        }
    }
);


// ==========================================
// INITIAL CONNECTION TEST
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await checkSupabaseConnection();

    }
);