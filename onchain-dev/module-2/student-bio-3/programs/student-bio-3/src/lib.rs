use anchor_lang::prelude::*;

declare_id!("DXyWx8BoogZZiPkhMLvg7Kz7TGvq7YARze1UopY2aUru");

#[program]
pub mod student_bio_3 {
    use super::*;

    pub fn create_intro(
        ctx: Context<CreateIntro>,
        name: String,
        message: String,
    )-> Result<()>{
        msg!("Creating student account");
        let student_account = &mut ctx.accounts.student_account;
        student_account.student = ctx.accounts.initializer.key();
        student_account.name = name;
        student_account.message = message;
        Ok(())
    }

    pub fn update_intro(
        ctx: Context<UpdateIntro>,
        name: String,
        message: String,
    )-> Result<()>{
        let student_account = &mut ctx.accounts.student_account;
        student_account.student = ctx.accounts.initializer.key();
      
        student_account.message = message;

        msg!("student account space reallocated");
        msg!(" name: {}", name);
        Ok(())
    }

    pub fn delete_intro(_ctx: Context<DeleteIntro>, name: String) -> Result<()> {
        msg!("student account with name {} deleted", name);
        Ok(())
    }



}

#[account]
pub struct StudentAccountState{
    pub student: Pubkey,
    pub name: String,
    pub message: String,
}

impl Space for StudentAccountState {
    const INIT_SPACE: usize = 8 + 32 + 1 + 4 + 4;
}


#[derive(Accounts)]
#[instruction(name: String, message: String)]
pub struct CreateIntro<'info>{
    #[account(
        init,
        seeds=[name.as_bytes(),initializer.key().as_ref()], 
        bump, 
        payer = initializer, 
        space = StudentAccountState::INIT_SPACE+name.len()+message.len(),
    )]
    pub student_account: Account<'info, StudentAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(name: String, message: String)]
pub struct UpdateIntro<'info>{
    #[account(
        mut,
        seeds=[name.as_bytes(),initializer.key().as_ref()], 
        bump, 
        realloc = StudentAccountState::INIT_SPACE+name.len()+message.len(),
        realloc::payer = initializer, 
        realloc::zero=true
    )]
    pub student_account: Account<'info, StudentAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteIntro<'info>{
    #[account(
        mut,
        seeds=[name.as_bytes(),initializer.key().as_ref()], 
        bump, 
        close=initializer,
    )]
    pub student_account: Account<'info, StudentAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}