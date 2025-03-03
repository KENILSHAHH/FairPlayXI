program fantasy_sports_12.aleo {

    // A record representing a contest.
    record Contest {
        owner: address,
        contest_id: u64,
        entry_fee: u64,
        prize_pool: u64,
        is_active: bool,
    }

    // A record representing a team of exactly 11 players.
    record Team {
        owner: address,
        contest_id: u64,
        player_1: address,
        player_2: address,
        player_3: address,
        player_4: address,
        player_5: address,
        player_6: address,
        player_7: address,
        player_8: address,
        player_9: address,
        player_10: address,
        player_11: address,
    }

    // A record representing a user's entry in a contest.
    record Entry {
        owner: address,
        contest_id: u64,
        player: address,
        team: Team, // The full team record
        is_winner: bool,
    }

    // Creates a new contest.
    transition create_contest(owner: address, contest_id: u64, entry_fee: u64, prize_pool: u64) -> Contest {
        // Ensure the contest prize is greater than the entry fee.
        assert(prize_pool > entry_fee);

        return Contest {
            owner: owner,
            contest_id: contest_id,
            entry_fee: entry_fee,
            prize_pool: prize_pool,
            is_active: true,
        };
    }

    // Allows a user to enter a contest with a properly formed team.
    transition join_contest(owner: address, contest: Contest, player: address, team: Team) -> Entry {
        // Ensure contest is active.
        assert(contest.is_active == true);
        
        // Ensure the team belongs to the player and is for the correct contest.
        assert(team.owner == player);
        assert(team.contest_id == contest.contest_id);

        return Entry {
            owner: owner,
            contest_id: contest.contest_id,
            player: player,
            team: team,
            is_winner: false,
        };
    }

    // Resolves a contest and selects a winner.
    transition resolve_winner(owner: address, contest: Contest, winner_entry: Entry) -> Entry {
        // Ensure only the contest creator can resolve.
        assert(self.caller == contest.owner);

        return Entry {
            owner: owner,
            contest_id: contest.contest_id,
            player: winner_entry.player,
            team: winner_entry.team,
            is_winner: true,
        };
    }

    // Distributes the prize to the winner.
    transition distribute_prize(contest: Contest, winner: Entry) -> Contest {
        // Ensure the contest is active.
        assert(contest.is_active == true);
        
        // Ensure the winner is valid.
        assert(winner.is_winner == true);

        // Mark contest as inactive.
        return Contest {
            owner: contest.owner,
            contest_id: contest.contest_id,
            entry_fee: contest.entry_fee,
            prize_pool: 0u64, // Prize distributed, pool is now empty
            is_active: false,
        };
    }
}
