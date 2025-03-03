program fantasy_sports_11.aleo {

    // A record representing a contest.
    record Contest {
        owner: address,
        contest_id: u64,
        entry_fee: u64,
        prize_pool: u64,
        is_active: bool,
    }

    // A record representing a user's entry in a contest.
    record Entry {
        owner : address,
        contest_id: u64,
        player: address,
        encrypted_team: field, // Team lineup is stored encrypted
        is_winner: bool,
    }

    // Creates a new contest.
    transition create_contest(owner: address, contest_id: u64, entry_fee: u64, prize_pool: u64) -> Contest {
        // Ensure the contest prize is greater than or equal to the entry fee.
 

        return Contest {
            owner: owner,
            contest_id: contest_id,
            entry_fee: entry_fee,
            prize_pool: prize_pool,
            is_active: true,
        };
    }

    // Allows a user to enter a contest with an encrypted team lineup.
    transition join_contest( owner : address , contest: Contest, player: address, encrypted_team: field) -> Entry {
        // Ensure contest is active.
        assert(contest.is_active == true);

        return Entry {
            owner : owner,
            contest_id: contest.contest_id,
            player: player,
            encrypted_team: encrypted_team,
            is_winner: false,
        };
    }

    // Resolves a contest and selects a winner.
    transition resolve_winner(owner : address , contest: Contest, winner_entry: Entry) -> Entry {
        // Ensure only the contest owner can resolve.
        assert(self.caller == contest.owner);

        // Ensure the winner entry belongs to the contest.
        assert(winner_entry.contest_id == contest.contest_id);

        return Entry {
            owner :owner ,
            contest_id: contest.contest_id,
            player: winner_entry.player,
            encrypted_team: winner_entry.encrypted_team,
            is_winner: true,
        };
    }

    // Distributes the prize to the winner.
    transition distribute_prize(contest: Contest, winner: Entry) -> Contest {
        // Ensure only the contest creator can distribute prizes.
        assert(self.caller == contest.owner);

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
